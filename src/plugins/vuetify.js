import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#4667ac',
            secondary: '#edf0f5',
            accent: '#64a550'
          },
        },
      },
});
