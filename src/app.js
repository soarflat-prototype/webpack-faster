import $ from 'jquery';
import velocity from 'velocity-animate';
import moduleA from './modules/moduleA';

const $app = $('.app');

velocity($app, 'fadeOut', {
  delay: 500,
  complete: () => {
    moduleA();
  },
});
