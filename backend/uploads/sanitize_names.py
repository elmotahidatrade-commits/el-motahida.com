import os

uploads_dir = r"c:\Users\mg\Desktop\EL-motahida trade\backend\uploads"
files = os.listdir(uploads_dir)

for filename in files:
    if filename.endswith(".jpg") or filename.endswith(".png") or filename.endswith(".mp4"):
        # Clean name: lowercase, replace spaces with hyphens, remove special chars
        new_name = filename.lower().replace(" & ", "-").replace(" ", "-").replace("_", "-")
        # Remove consecutive hyphens
        while "--" in new_name:
            new_name = new_name.replace("--", "-")
        
        old_path = os.path.join(uploads_dir, filename)
        new_path = os.path.join(uploads_dir, new_name)
        
        if old_path != new_path:
            try:
                # Use a temp name first to avoid Windows case-insensitivity issues
                temp_path = old_path + ".temp"
                os.rename(old_path, temp_path)
                if os.path.exists(new_path):
                    os.remove(new_path)
                os.rename(temp_path, new_path)
                print(f"Renamed: {filename} -> {new_name}")
            except Exception as e:
                print(f"Error renaming {filename}: {e}")
