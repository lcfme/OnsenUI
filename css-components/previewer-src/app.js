import {getPlatform, getPlatformFilter} from './platform';
import {createAppComponent} from './components/app';

function init() {
  const components = makeComponents();
  const categories = makeCategories(components);

  page('*', () => {
    setTimeout(() => {
      app.platform = getPlatform();
    }, 0);
  });
  page();

  var app = new Vue(createAppComponent({
    components,
    categories,
    platform: getPlatform()
  }));
};

function makeCategories(components) {
  const set = new Set();
  components.forEach(component => {
    set.add(component.category);
  });

  return [...set.values()].map(value => {
    return {
      name: value,
      hash: value.toLowerCase().replace(/ /g, '_')
    };
  });
}

function makeComponents() {
  return JSON.parse(document.querySelector('#components-data').textContent).map(component => {
    component = component.annotation;
    component.id = component.name.toLowerCase().replace(/ /g, '_');
    return component;
  });
}

window.onload = init;

