/* wwEditor:start */
import './components/Configuration/SettingsEdit.vue';
import './components/Configuration/SettingsSummary.vue';
import './components/Redirections/SettingsEdit.vue';
import './components/Redirections/SettingsSummary.vue';
import './components/Functions/StoreToken.vue';
/* wwEditor:end */

const COOKIE_NAME = 'ww-auth-token';

export default {
    /*=============================================m_ÔÔ_m=============================================\
        Plugin API
    \================================================================================================*/
    async onLoad() {
        const token = window.vm.config.globalProperties.$cookie.getCookie(COOKIE_NAME);
        wwLib.wwVariable.updateValue(`${this.id}-token`, token);
        if (token) await this.fetchUser();
    },
    /*=============================================m_ÔÔ_m=============================================\
        Auth API
    \================================================================================================*/
    /* wwEditor:start */
    // async getRoles() {},
    /* wwEditor:end */
    /*=============================================m_ÔÔ_m=============================================\
        Auth Token API
    \================================================================================================*/
    storeToken(token) {
        window.vm.config.globalProperties.$cookie.setCookie(COOKIE_NAME, token);
        wwLib.wwVariable.updateValue(`${this.id}-token`, token);
    },
    removeToken() {
        window.vm.config.globalProperties.$cookie.removeCookie(COOKIE_NAME);
        wwLib.wwVariable.updateValue(`${this.id}-token`, null);
    },
    async fetchUser() {
        const { userEndpoint, type, name } = this.settings.publicData;
        const token = wwLib.wwVariable.getValue(`${this.id}-token`);

        if (!userEndpoint) throw new Error('No user endpoint defined.');
        if (!type) throw new Error('No Auth type defined.');

        try {
            const { data } = await axios.get(userEndpoint, { headers: buildHeader(type, name, token) });
            wwLib.wwVariable.updateValue(`${this.id}-user`, data);
            wwLib.wwVariable.updateValue(`${this.id}-isAuthenticated`, true);
            return data;
        } catch (err) {
            this.logout();
            throw err;
        }
    },
    logout() {
        this.removeToken();
        wwLib.wwVariable.updateValue(`${this.id}-user`, null);
        wwLib.wwVariable.updateValue(`${this.id}-isAuthenticated`, false);
    },
};

const buildHeader = (type, name, token) => {
    switch (type) {
        case 'bearer-token':
            return { Authorization: `Bearer ${token}` };
        case 'basic-token':
            return { Authorization: `Basic ${token}` };
        case 'custom-header':
            return { [name]: token };
        default:
            return {};
    }
};
