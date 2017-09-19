<template>
  <div class="Settings AppMain__view">
    <h1>Settings</h1>
    <form>
      <div class="Form__group">
        <label>
          <span class="Form__label">Email address</span>
          <input type="email" class="Form__control" aria-describedby="emailHelp" placeholder="Enter email" v-model="form.email">
        </label>
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="Form__group">
        <label>
          <span class="Form__label">Password</span>
          <input type="password" class="Form__control" placeholder="Password" v-model="form.password">
          <PostalCode />
        </label>
      </div>
      <div class="Form__group">
        <label class="Form__check__label">
          <input type="checkbox" v-model="form.remember" class="Form__check__input"> Save login for 2 weeks
        </label>
      </div>
      <button type="submit" class="Button Button--primary">Submit</button>
    </form>
  </div>
</template>

<script>
const PostalCode = {
  name: 'PostalCode',
  data() {
    return {
      value: '',
    };
  },
  render(h) {
    return h('div', [
      h('input', {
        ref: 'input',
        attrs: {
          placeholder: '1234-123',
        },
        on: {
          input: this.updateValueHandler,
        },
      }),
    ]);
  },
  methods: {
    updateValueHandler($event) {
      this.updateValue($event.target.value);
    },
    updateValue(value) {
      const sanitizedValue = value.replace('-', '');
      const valueMatch = sanitizedValue.match(/(\d{1,4})(\d{1,3})?/);

      let formattedValue;
      if (!valueMatch) {
        formattedValue = '';
      } else if (valueMatch[2]) {
        formattedValue = `${valueMatch[1]}-${valueMatch[2]}`;
      } else if (valueMatch[1]) {
        formattedValue = `${valueMatch[1]}`;
      }

      // If the value was not already normalized,
      // manually override it to conform
      if (formattedValue !== value) {
        this.$refs.input.value = formattedValue;
      }
      // Emit the number value through the input event
      this.$emit('input', String(formattedValue));
    },
  },
};

export default {
  name: 'Settings',
  components: {
    PostalCode,
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
        remember: false,
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.Form {
  &__group {
    margin-bottom: 10px;
  }
  &__label {}
  &__control {
    display: block;
    width: 100%;
    box-sizing: border-box;
    border-radius: 3px;
    border: 1px solid #ccc;
    padding: .5rem .75rem;
    font-size: .875rem;
    line-height: 1.25;
  }
  &__check {
    &__label {}
    &__input {}
  }
}

.Button {
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: .5rem .75rem;
  font-size: .875rem;
  line-height: 1.25;
  border-radius: .25rem;
  transition: all .15s ease-in-out;

  &--primary {
    color: rgba(white, 0.8);
    background-color: #405db5;
  }
}
</style>
