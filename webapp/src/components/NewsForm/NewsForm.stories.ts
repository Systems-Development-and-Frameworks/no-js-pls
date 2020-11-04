import NewsForm from './NewsForm.vue';

export default {
  title: 'components/NewsForm',
  component: NewsForm,
  argTypes: {
    onCreate: {
      action: 'Create Item',
    },
  },
  /* parameters: {
    a11y: {
      // optional selector which element to inspect
      element: '#root',
      // axe-core configurationOptions (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1)
      config: {},
      // axe-core optionsParameter (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter)
      options: {},
      // optional flag to prevent the automatic check
      manual: true,
    },
  }, */
};

// @ts-ignore
const Template = (args: any, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { NewsForm },
  template: `<NewsForm @sendTitle="onCreate"></NewsForm>`,
});

export const Default = Template.bind({});
