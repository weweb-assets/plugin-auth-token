<template>
    <wwEditorInputRow
        label="Token"
        type="query"
        :model-value="token"
        bindable
        placeholder="Enter a token"
        @update:modelValue="setToken"
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
        token() {
            return this.args[0];
        },
    },
    methods: {
        setToken(token) {
            this.$emit('update:args', [token]);
        },
    },
};
</script>
