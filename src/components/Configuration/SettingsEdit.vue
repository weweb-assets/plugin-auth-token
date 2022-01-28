<template>
    <div class="auth-token-settings-edit">
        <wwEditorFormRow required label="User Endpoint">
            <wwEditorInputText
                type="text"
                placeholder="https://api-url.com/users/me"
                :model-value="settings.publicData.userEndpoint"
                large
                @update:modelValue="setUserEndpoint"
            />
        </wwEditorFormRow>
        <wwEditorFormRow required label="Auth Type">
            <wwEditorInputTextSelect
                placeholder="Select a type of authentication"
                :model-value="settings.publicData.type"
                large
                :options="typeOptions"
                @update:modelValue="setType"
            />
        </wwEditorFormRow>
        <wwEditorFormRow v-if="settings.publicData.type === 'cookie'" required label="Cookie Name">
            <wwEditorInputText
                placeholder="Enter a cookie name"
                :model-value="settings.publicData.name"
                large
                @update:modelValue="setName"
            />
        </wwEditorFormRow>
        <wwEditorFormRow v-else-if="settings.publicData.type === 'custom-header'" required label="Custom Header Name">
            <wwEditorInputText
                placeholder="Enter a header key name"
                :model-value="settings.publicData.name"
                large
                @update:modelValue="setName"
            />
        </wwEditorFormRow>
    </div>
</template>

<script>
export default {
    props: {
        settings: { type: Object, required: true },
    },
    emits: ['update:settings'],
    data() {
        return {
            typeOptions: [
                { label: 'Auth Bearer Token', value: 'bearer-token' },
                { label: 'Auth Basic Token', value: 'basic-token' },
                // { label: 'Cookie', value: 'cookie' },
                { label: 'Custom Header', value: 'custom-header' },
            ],
        };
    },
    methods: {
        setUserEndpoint(value) {
            this.$emit('update:settings', {
                ...this.settings,
                publicData: { ...this.settings.publicData, userEndpoint: value },
            });
        },
        setType(value) {
            this.$emit('update:settings', {
                ...this.settings,
                publicData: { ...this.settings.publicData, type: value },
            });
        },
        setName(value) {
            this.$emit('update:settings', {
                ...this.settings,
                publicData: { ...this.settings.publicData, name: value },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.auth-token-settings-edit {
    display: flex;
    flex-direction: column;
    &__link {
        color: var(--ww-color-blue-500);
        margin-left: var(--ww-spacing-02);
    }
    &__row {
        display: flex;
        align-items: center;
    }
    &__radio-label {
        margin-left: var(--ww-spacing-02);
    }
}
</style>
