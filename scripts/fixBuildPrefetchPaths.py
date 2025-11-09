import os
import pathlib

def fixBuildPrefetchPaths(base_dir="out"):
    out_dir = pathlib.Path(base_dir).resolve()
    for root, _, files in os.walk(out_dir):
        root_path = pathlib.Path(root)
        for file in files:
            if file == "__PAGE__.txt" or file == "breakdown.txt":
                source = root_path / file
                # __PAGE__ files in breakdown directories need to be moved two levels up
                if root_path.parts[-1] == "breakdown" and file == "__PAGE__.txt":
                    new_filename = f"{root_path.parts[-2]}.{root_path.parts[-1]}.{file}"
                    destination = root_path.parent.parent / new_filename
                # Other __PAGE__ and breakdown.txt files and should be moved one level up
                else:
                    new_filename = f"{root_path.name}.{file}"
                    destination = root_path.parent / new_filename
                try:
                    source.rename(destination)
                    print(f"Moved: {file} -> {new_filename}")
                except Exception as e:
                    print(f"Error moving {file}: {str(e)}")

if __name__ == "__main__":
    fixBuildPrefetchPaths()