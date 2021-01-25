import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import NewsList from '@/components/NewsList/NewsList.vue';
import NewsItem from '@/components/NewsItem/NewsItem.vue';

describe('NewsList.vue', () => {
  test('renders list is empty message when empty', async () => {
    const msg = 'list is empty :(';
    jest.spyOn(NewsList.methods, 'setupNewsList').mockImplementation(() => {});
    const wrapper = shallowMount(NewsList);

    await wrapper.setData({
      newsItems: [],
      token: '',
      authorId: '',
    });

    expect(wrapper.html()).toContain(msg);
  });

  test('renders <NewsItem> for each item', async () => {
    jest.spyOn(NewsList.methods, 'setupNewsList').mockImplementation(() => {});
    const wrapper = shallowMount(NewsList);
    wrapper.setData({
      newsItems: [
          {
          id: '1',
          title: 'Test1',
          votes: 0,
          author: {
            id: '1',
            name: 'TestMan',
            email: 'test@test.de'
          }
        },{
          id: '2',
          title: 'Test2',
          votes: 0,
          author: {
            id: '2',
            name: 'TestMan',
            email: 'test@test.de'
          }
        },
      ],
      token: '',
      authorId: '',
    });
    const items = wrapper.vm.$data.newsItems;
    await wrapper.vm.$nextTick();

    expect(wrapper.findAllComponents(NewsItem).length).toBe(items.length);
  });

  test('toggles between ascending and descending order', async () => {
    jest.spyOn(NewsList.methods, 'setupNewsList').mockImplementation(() => {});
    const wrapper = shallowMount(NewsList);
    wrapper.setData({
      newsItems: [
        {
          id: '1',
          title: 'Test1',
          votes: 0,
          author: {
            id: '1',
            name: 'TestMan',
            email: 'test@test.de'
          }
        },{
          id: '2',
          title: 'Test2',
          votes: 0,
          author: {
            id: '2',
            name: 'TestMan',
            email: 'test@test.de'
          }
        },{
          id: '3',
          title: 'Test3',
          votes: 0,
          author: {
            id: '2',
            name: 'TestMan',
            email: 'test@test.de'
          }
        },
      ],
      token: '',
      authorId: '',
      currentSortingOrder: 0,
    });
    await wrapper.vm.$nextTick(); // this is the greatest testing framework since the beginning of testing frameworks maybe ever (:

    const startingState = wrapper.vm.$data.currentSortingOrder;

    wrapper.find('button').trigger('click');

    expect(startingState).not.toBe(wrapper.vm.$data.currentSortingOrder);
  });
});
