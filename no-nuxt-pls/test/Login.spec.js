import { mount, shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils';
import LoginForm from '@/components/LoginForm/LoginForm.vue';
import Menu from '@/components/Menu/Menu.vue';


describe('Menu.vue', () => {
  test('renders login when user is not logged in', async () => {
    jest.spyOn(Menu.methods, 'setupMenu').mockImplementation(() => {});
    const wrapper = shallowMount(Menu, {
        stubs: {
          NuxtLink: RouterLinkStub
        }
      });
    const logoutButton = wrapper.find('button');
    expect(logoutButton.exists()).toBe(false);
  });

  test('renders logout when user is logged in', async () => {
    jest.spyOn(Menu.methods, 'setupMenu').mockImplementation(() => {});
    const wrapper = shallowMount(Menu, {
        stubs: {
          NuxtLink: RouterLinkStub
        }
      });
    wrapper.setData({token: 'ichbingesetzt'});
    await wrapper.vm.$nextTick();
    const logoutButton = wrapper.find('button');
    expect(logoutButton.exists()).toBe(true);
  });
});

describe('LoginForm.vue', () =>
{    
    test('not able to login with invalid credentials', async () => {
      const msg = 'Oops! Something went wrong.';
      const method = jest.spyOn(LoginForm.methods, 'submitLogin');
      const wrapper = shallowMount(LoginForm, {
          stubs: {
              NuxtLink: RouterLinkStub
          }
      });
      method.mockImplementation(() => { wrapper.vm.$data.error = {message: msg}});
      await wrapper.find('form').trigger('submit');
      expect(wrapper.html()).toContain(msg);
    });
});
