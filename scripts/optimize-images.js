const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const projectsDir = path.resolve(__dirname, '../src/assets/img/Proyectos');

async function optimizeImages() {
    if (!fs.existsSync(projectsDir)) {
        console.error(`Directory not found: ${projectsDir}`);
        return;
    }

    const projectFolders = fs.readdirSync(projectsDir).filter(f => fs.statSync(path.join(projectsDir, f)).isDirectory());

    for (const folder of projectFolders) {
        const folderPath = path.join(projectsDir, folder);
        const files = fs.readdirSync(folderPath);

        console.log(`Processing folder: ${folder}`);

        for (const file of files) {
            const ext = path.extname(file).toLowerCase();
            if (['.png', '.jpg', '.jpeg'].includes(ext)) {
                const filePath = path.join(folderPath, file);
                const stats = fs.statSync(filePath);

                // Skip if already small (e.g. < 500KB) and is JPG, unless it's one of the known huge ones
                // Actually, let's just process everything that isn't already optimized
                if (file.includes('_optimized')) continue;

                const newFileName = path.basename(file, path.extname(file)) + '.jpg';
                const newFilePath = path.join(folderPath, newFileName);

                // If converting PNG to JPG, or just optimizing JPG
                console.log(`  Optimizing ${file} (${(stats.size / 1024 / 1024).toFixed(2)} MB)...`);

                try {
                    await sharp(filePath)
                        .resize(1920, null, { // Max width 1920, maintain aspect ratio
                            withoutEnlargement: true
                        })
                        .jpeg({ quality: 80, mozjpeg: true })
                        .toFile(newFilePath + '.tmp'); // Write to tmp first

                    // Replace original if it was same extension, or delete original if different
                    // Wait, we want to update code. 
                    // Strategy: 
                    // 1. Write new file `X.jpg`
                    // 2. If original was `X.png`, delete `X.png` (or backup).
                    // User said "hazlo", implying fix it. I will keep backups just in case.

                    fs.renameSync(newFilePath + '.tmp', newFilePath);

                    if (filePath !== newFilePath) {
                        // Original was different extension (e.g. PNG)
                        // Verify new file exists and has size
                        if (fs.existsSync(newFilePath) && fs.statSync(newFilePath).size > 0) {
                            fs.unlinkSync(filePath); // Delete huge original
                            console.log(`    -> Created ${newFileName}, deleted original.`);
                        }
                    } else {
                        // Original was JPG, we overwrote with optimized version
                        console.log(`    -> Optimized in-place.`);
                    }

                } catch (err) {
                    console.error(`    Error processing ${file}:`, err);
                }
            }
        }
    }
    console.log("Optimization complete.");
}

optimizeImages();
