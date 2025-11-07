export default function decorate(block) {
  const [imageRow, headingRow, textRow, buttonsRow] = [...block.children];

  // Create hero container structure
  const heroContent = document.createElement('div');
  heroContent.className = 'hero-content';

  const heroImage = document.createElement('div');
  heroImage.className = 'hero-image';

  const heroText = document.createElement('div');
  heroText.className = 'hero-text';

  // Process image
  if (imageRow) {
    const img = imageRow.querySelector('img');
    if (img) {
      const picture = imageRow.querySelector('picture') || document.createElement('picture');
      if (!picture.querySelector('img')) {
        picture.appendChild(img.cloneNode(true));
      }
      heroImage.appendChild(picture);
    }
  }

  // Process heading
  if (headingRow) {
    const heading = document.createElement('h1');
    heading.textContent = headingRow.textContent.trim();
    heroText.appendChild(heading);
  }

  // Process body text
  if (textRow) {
    const description = document.createElement('p');
    description.className = 'hero-description';
    description.textContent = textRow.textContent.trim();
    heroText.appendChild(description);
  }

  // Process buttons
  if (buttonsRow) {
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'hero-buttons';

    const links = buttonsRow.querySelectorAll('a');
    links.forEach((link, index) => {
      const button = link.cloneNode(true);
      button.className = index === 0 ? 'button primary' : 'button secondary';
      buttonsContainer.appendChild(button);
    });

    heroText.appendChild(buttonsContainer);
  }

  // Assemble the hero
  heroContent.appendChild(heroImage);
  heroContent.appendChild(heroText);

  // Clear block and add new structure
  block.textContent = '';
  block.appendChild(heroContent);
}
