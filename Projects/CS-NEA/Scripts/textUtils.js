  /*
- fitMultiLineText(textContent, x, y, maxWidth, maxHeight, angle, tColour, defaultSize, defaultFont): 
  Draws text that wraps to fit within a specified width and height, adjusting the text size as needed. 

- wrapText(textContent, maxWidth, size): 
  Breaks text into lines that fit within a given width.

- calculateTextHeight(lines, size): 
  Calculates the total height of wrapped text.
*/

// Function to fit multi-line text within a set width and height
function fitMultiLineText(textContent, x, y, maxWidth, maxHeight, angle, tColour, defaultSize, defaultFont) {
    textSize(defaultSize); // Set text size
    textFont(defaultFont); // Set text font
  
    let textSizeValue = defaultSize; // Initialise text size
    let lines = wrapText(textContent, maxWidth, textSizeValue); // Wrap text
  
    // Reduce text size to fit within height
    while (calculateTextHeight(lines, textSizeValue) > maxHeight && textSizeValue > 1) {
      textSizeValue--; // Decrease text size
      lines = wrapText(textContent, maxWidth, textSizeValue); // Update wrapped text
    }
  
    // Draw the text
    push(); // Save drawing state
    translate(x, y); // Set position
    rotate(radians(angle)); // Apply rotation
    fill(tColour); // Set text colour
    textSize(textSizeValue); // Set updated text size
    textFont(defaultFont); // Ensure correct font
    textAlign(CENTER, CENTER); // Centre-align text
  
    // Draw text lines
    for (let i = 0; i < lines.length; i++) {
      text(lines[i], 0, i * textSizeValue); // Draw each line
    }
  
    //rect(0, 0, 5, 5); // (Optional) Draw rectangle to show text position
  
    pop(); // Restore drawing state
  }
  
  // Function to wrap text into multiple lines
  function wrapText(textContent, maxWidth, size) {
    textSize(size); // Set text size for measurement
    let words = textContent.split(' '); // Split text into words
    let lines = []; // Line storage
    let line = ''; // Build line
  
    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + ' '; // Test line with new word
      let testWidth = textWidth(testLine); // Measure line width
  
      if (testWidth > maxWidth && i > 0) { // If line is too wide
        lines.push(line); // Save line
        line = words[i] + ' '; // Start new line
      } else {
        line = testLine; // Continue line
      }
    }
  
    if (line) {
      lines.push(line); // Add last line
    }
  
    return lines; // Return wrapped lines
  }
  
  // Function to calculate the total height of the wrapped text
  function calculateTextHeight(lines, size) {
    return lines.length * size; // Total height
  }