import NewsItem from './NewsItem.vue';

export default {
  title: 'components/NewsItem',
  component: NewsItem,
  argTypes: {
    onUpdate: {
      action: 'Update Item',
    },
    onRemove: {
      action: 'Remove Item',
    },
  },
};

// @ts-ignore
const Template = (args: any, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { NewsItem },
  template: `<NewsItem :news="$props.news" @update="onUpdate" @remove="onRemove"></NewsItem>`,
});

export const Default = Template.bind({});
// @ts-ignore
Default.args = {
  news: {
    id: 0,
    title: 'Test',
    votes: 2,
  },
};
