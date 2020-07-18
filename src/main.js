import Vue from 'vue';
import App from './App.vue';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.filter('displayRounded', (points) => {
  if (!points) {
    return '';
  }

  const truncated = Math.trunc(points * 1000).toString();
  const truncatedLength = truncated.length;
  const unit = parseInt(truncated[truncatedLength - 1], 10);
  let aboveUnit = parseInt(truncated.substring(0, truncatedLength - 1), 10);

  if (unit >= 5) {
    aboveUnit += 1;
  }
  aboveUnit = aboveUnit.toString();
  const aboveUnitLength = aboveUnit.length;

  return `${aboveUnit.substring(0, aboveUnitLength - 2)}.${aboveUnit.substring(aboveUnitLength - 2)}`;
});

Vue.config.productionTip = false;

new Vue({
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
