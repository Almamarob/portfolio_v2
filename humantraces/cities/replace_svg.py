with open('cities.html', 'r') as f:
    content = f.read()

with open('europe-minimal.svg', 'r') as f:
    new_svg = f.read()

# Find SVG section
start_marker = '<svg viewBox="0 0 800 900"'
end_marker = '</svg>'

start_idx = content.find(start_marker)
if start_idx == -1:
    start_marker = '<svg'
    start_idx = content.find(start_marker)

end_idx = content.find(end_marker, start_idx) + len(end_marker)

if start_idx != -1 and end_idx > start_idx:
    # Get indentation
    line_start = content.rfind('\n', 0, start_idx) + 1
    indent = content[line_start:start_idx]
    
    # Indent new SVG
    new_svg_lines = new_svg.strip().split('\n')
    indented_svg = '\n'.join([indent + line if line.strip() else '' for line in new_svg_lines])
    
    # Replace
    new_content = content[:start_idx] + indented_svg + content[end_idx:]
    
    with open('cities.html', 'w') as f:
        f.write(new_content)
    
    print("SVG replaced successfully")
else:
    print(f"Error: Could not find SVG section (start: {start_idx}, end: {end_idx})")
