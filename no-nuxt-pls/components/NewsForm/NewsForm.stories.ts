import NewsForm from './NewsForm.vue';

export default {
  title: 'components/NewsForm',
  component: NewsForm,
  argTypes: {
    onCreate: {
      action: 'Create Item',
    },
  },
};

// @ts-ignore
const Template = (args: any, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { NewsForm },
  template: `<NewsForm @sendTitle="onCreate"></NewsForm>`,
});

export const Default = Template.bind({});
