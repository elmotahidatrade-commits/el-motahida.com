import os
import shutil

src_dir = r"c:\Users\mg\Desktop\EL-motahida trade\media\edits"
dst_dir = r"c:\Users\mg\Desktop\EL-motahida trade\backend\uploads"

files = os.listdir(src_dir)

for filename in files:
    if filename.endswith(".jpg") or filename.endswith(".png") or filename.endswith(".mp4"):
        # Clean name: lowercase, replace spaces with hyphens, remove special chars
        new_name = filename.lower().replace(" & ", "-").replace(" ", "-").replace("_", "-")
        # Remove consecutive hyphens
        while "--" in new_name:
            new_name = new_name.replace("--", "-")
        
        src_path = os.path.join(src_dir, filename)
        dst_path = os.path.join(dst_dir, new_name)
        
        try:
            shutil.copy2(src_path, dst_path)
            print(f"Copied & Sanitized: {filename} -> {new_name}")
        except Exception as e:
            print(f"Error processing {filename}: {e}")
