import { createHash } from "crypto";
import { promises as fs } from "fs";
import { join } from "path";

const CACHE_DIR = "./public/cached-images";
const downloadPromises: Record<string, Promise<void>> = {};

export async function ensureCacheDir() {
  try {
    await fs.access(CACHE_DIR);
  } catch {
    await fs.mkdir(CACHE_DIR, { recursive: true });
  }
}

export function getImageHash(url: string): string {
  return createHash("md5").update(url).digest("hex");
}

export function getImageExtension(url: string): string {
  const urlParts = url.split("?")[0]; // Remove query params
  const extension = urlParts.split(".").pop()?.toLowerCase();

  // Default to jpg if no extension or unsupported format
  if (
    !extension ||
    !["jpg", "jpeg", "png", "webp", "gif"].includes(extension)
  ) {
    return "jpg";
  }

  return extension;
}

export async function downloadAndCacheImage(url: string): Promise<string> {
  if (!url || url === "/18.png") {
    return "/18.png"; // Return default image
  }

  await ensureCacheDir();

  const hash = getImageHash(url);
  const extension = getImageExtension(url);
  const filename = `${hash}.${extension}`;
  const filePath = join(CACHE_DIR, filename);
  const publicPath = `/cached-images/${filename}`;

  try {
    // Check if file already exists
    await fs.access(filePath);
    return publicPath;
  } catch {
    if (!downloadPromises[filePath]) {
      downloadPromises[filePath] = (async () => {
        try {
          const response = await fetch(url, {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            },
          });

          if (!response.ok) {
            console.error(
              `Failed to download image: ${response.status} ${response.statusText}`,
            );
            return;
          }

          const arrayBuffer = await response.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);

          await fs.writeFile(filePath, buffer);

          console.log(`Image cached successfully: ${publicPath}`);
        } catch (e) {
          // log error
        } finally {
          delete downloadPromises[filePath];
        }
      })();
    }
    return "/18.png";
  }
}

export async function getCachedImageUrl(
  notionImageUrl: string,
): Promise<string> {
  if (!notionImageUrl || notionImageUrl === "/18.png") {
    return "/18.png";
  }

  const hash = getImageHash(notionImageUrl);
  const extension = getImageExtension(notionImageUrl);
  const filename = `${hash}.${extension}`;
  const filePath = join(CACHE_DIR, filename);
  const publicPath = `/cached-images/${filename}`;

  try {
    await fs.access(filePath);
    return publicPath;
  } catch {
    // Image not cached yet, trigger download
    return await downloadAndCacheImage(notionImageUrl);
  }
}

// Cache-busting: remove old cached image if the Notion image URL changes
export async function updateCachedImage(
  previousUrl: string | null,
  currentUrl: string,
): Promise<string> {
  if (previousUrl && previousUrl !== currentUrl) {
    // Remove old cached image
    const oldHash = getImageHash(previousUrl);
    const oldExt = getImageExtension(previousUrl);
    const oldFile = join(CACHE_DIR, `${oldHash}.${oldExt}`);
    try {
      await fs.unlink(oldFile);
    } catch {}
  }
  // Cache and return the new image
  return await getCachedImageUrl(currentUrl);
}
