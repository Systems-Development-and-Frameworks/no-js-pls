import { mount } from '@vue/test-utils';
import NewsList from './NewsList.vue';
import NewsItem from '../NewsItem/NewsItem.vue';

describe('NewsList.vue', () => {
  test('renders list is empty message when empty', async () => {
    const msg = 'list is empty :(';
    const wrapper = mount(NewsList);
    const items = wrapper.findAllComponents(NewsItem);

    for (let i = 0; i < items.length; i++) {
      const news = items.at(i).vm.$props.news;
      await items.at(i).vm.$emit('remove', news);
    }

    expect(wrapper.html()).toContain(msg);
  });

  test('renders <NewsItem> for each item', () => {
    const wrapper = mount(NewsList);
    const items = wrapper.vm.$data.newsItems;

    expect(wrapper.findAllComponents(NewsItem).length).toBe(items.length);
  });

  test('toggles between ascending and descending order', async () => {
    const wrapper = mount(NewsList);
    const startingState = wrapper.vm.$data.currentSortingOrder;

    wrapper.find('button').trigger('click');

    expect(startingState).not.toBe(wrapper.vm.$data.currentSortingOrder);
  });
});
