export default {
    features: {
        auth: true,
    },
    editor: {
        settings: [
            {
                label: 'Configuration',
                icon: 'advanced',
                edit: () => import('./src/components/Configuration/SettingsEdit.vue'),
                summary: () => import('./src/components/Configuration/SettingsSummary.vue'),
                getIsValid(settings) {
                    const { userEndpoint, type } = settings.publicData;
                    return !!userEndpoint && !!type;
                },
            },
        ],
        designSystemId: '34d431d4-405c-4969-8ac6-658be9787c67',
    },
    variables: [
        { name: 'user', value: 'user', type: 'object', defaultValue: null },
        { name: 'accessToken', value: 'accessToken', type: 'string', defaultValue: null },
        { name: 'refreshToken', value: 'refreshToken', type: 'string', defaultValue: null },
        { name: 'isAuthenticated', value: 'isAuthenticated', type: 'boolean', defaultValue: false },
    ],
    actions: [
        {
            name: 'Fetch User',
            code: 'fetchUser',
            isAsync: true,
            /* wwEditor:start */
            copilot: {
                description: 'Fetches the current user data using the stored access token',
                returns: 'object',
                schema: {}
            },
            /* wwEditor:end */
        },
        {
            name: 'Store token',
            code: 'storeToken',
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/StoreToken.vue'),
            getIsValid({ accessToken }) {
                return !!accessToken;
            },
            copilot: {
                description: 'Stores authentication tokens in cookies and updates plugin variables',
                returns: 'void',
                schema: {
                    accessToken: {
                        type: 'string',
                        description: 'The access token to store for authentication',
                        bindable: true
                    },
                    refreshToken: {
                        type: 'string',
                        description: 'The refresh token used to obtain new access tokens',
                        bindable: true
                    }
                }
            },
            /* wwEditor:end */
        },
        {
            name: 'Logout',
            code: 'logout',
            /* wwEditor:start */
            copilot: {
                description: 'Removes stored tokens and resets authentication state',
                returns: 'void',
                schema: {}
            },
            /* wwEditor:end */
        },
    ],
};