import './style.scss';
import plantNames from './plants.json';

window.DatoCmsPlugin.init((plugin) => {
  plugin.startAutoResizer();

  console.clear();

  let initialValue = [];
  try {
    initialValue = JSON.parse(plugin.getFieldValue(plugin.fieldPath));
  } catch (error) {
    console.error('unable to parse initial value', error);
  }

  console.log('initial value:', initialValue);

  const container = document.createElement('div');
  const label = document.createElement('label');
  label.textContent = 'Search plant in PlantNet database';
  label.setAttribute('for', 'plantName');
  container.appendChild(label);

  const input = document.createElement('input');
  input.id = 'plantName';
  input.value = initialValue.join(', ');
  input.classList.add('tagify--outside');
  container.appendChild(input);

  container.classList.add('container');

  document.body.appendChild(container);

  const tagInput = new window.Tagify(input, {
    enforceWhitelist: true,
    whitelist: plantNames,
    dropdown: {
      maxItems: 7,
      position: 'input',
      // enabled: 0, // always opens dropdown when input gets focus
    },
  });

  const updateField = () => {
    const newFieldValue = tagInput.value.map(item => item.value);
    console.log({ newFieldValue });
    plugin.setFieldValue(plugin.fieldPath, JSON.stringify(newFieldValue));
  };

  tagInput.on('add', updateField);
});
