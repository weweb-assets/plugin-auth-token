<template>
    <wwEditorInputRow
        label="Access token"
        type="query"
        :model-value="accessToken"
        bindable
        placeholder="Enter a access token"
        required
        @update:modelValue="setAccessToken"
    />
    <wwEditorInputRow
        label="Refresh token"
        type="query"
        :model-value="refreshToken"
        bindable
        placeholder="Enter a refresh token"
        @update:modelValue="setRefreshToken"
    />
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        args: { type: Array, default: () => [null] },
    },
    emits: ['update:args'],
    computed: {
        accessToken() {
            return this.args[0];
        },
        refreshToken() {
            return this.args[1];
        },
    },
    methods: {
        setAccessToken(accessToken) {
            this.$emit('update:args', [accessToken, this.refreshToken]);
        },
        setRefreshToken(refreshToken) {
            this.$emit('update:args', [this.accessToken, refreshToken]);
        },
    },
};
</script>
