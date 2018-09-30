export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    proxyValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
  },
};
