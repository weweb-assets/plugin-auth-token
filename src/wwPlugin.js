/* wwEditor:start */
import './components/Configuration/SettingsEdit.vue';
import './components/Configuration/SettingsSummary.vue';
import './components/Redirections/SettingsEdit.vue';
import './components/Redirections/SettingsSummary.vue';
import './components/Functions/StoreToken.vue';
/* wwEditor:end */

export default {
    /*=============================================m_ÔÔ_m=============================================\
        Plugin API
    \================================================================================================*/
    async onLoad() {
        await this.getUser();
    },
    /*=============================================m_ÔÔ_m=============================================\
        Auth API
    \================================================================================================*/
    /* wwEditor:start */
    // async getRoles() {},
    /* wwEditor:end */
    storeToken([token]) {
        wwLib.wwVariable.updateValue(`${this.id}-token`, token);
    },
    async getUser() {
        const { userEndpoint, type, name } = this.settings.publicData;
        const token = wwLib.wwVariable.getValue(`${this.id}-token`);

        if (!userEndpoint || !type) return;

        try {
            const { data } = await axios.get(userEndpoint, { headers: buildHeader(type, name, token) });
            wwLib.wwVariable.updateValue(`${this.id}-user`, data);
            wwLib.wwVariable.updateValue(`${this.id}-isAuthenticated`, true);
        } catch (err) {
            wwLib.wwVariable.updateValue(`${this.id}-user`, null);
            wwLib.wwVariable.updateValue(`${this.id}-isAuthenticated`, false);
        }
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
