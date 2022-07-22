<template lang="pug">
transition(name="fade")
  .modal-wrapper(v-if="open")
    .modal-backdrop(@click="cancel")
    .modal
      button.close(@click="cancel")
        svg.icon
          use(xlink:href="#close")
      .modal-body
        .rte(v-html="message")
      .modal-footer(v-if="this.state == null")
        Btn.bg(@click="confirm")
          span(v-html="confirmButton")
</template>
<script>
/**
 * Utilisation



const resolver = async (result) => {
  try {
    const confirm = await result;
    // Dome smthing
    return { ok: true }
  } catch (e) {
    this.$notify({
      group: "all",
      type: "error",
      title: "Une erreur est survenue, merci de réessayer",
    });
    return { ok: false }
  }
}

this.$dialog.open({
  message: `<p>Êtes vous sûr ?</p>`,
  successMessage: `Ok`,
  confirmButton: "Confirmer",
  resolver: resolver
});


 */
export default {
  data() {
    return {
      state: null,
      open: false,
      message: "",
      successMessage: "",
      confirmButton: "Confirmer",
      cancelButton: "Annuler",
      resolver: () => null,
    };
  },
  mounted() {
    this.$nuxt.$on("dialog", this.dialog);
  },
  methods: {
    success() {
      this.message = this.successMessage;
      this.state = "success";
    },
    async confirm() {
      const res = await this.resolver(
        new Promise((resolve) => resolve("confirmed"))
      );
      if (res && res.ok) {
        this.success();
      } else {
        this.close();
      }
    },
    cancel() {
      // this.resolver(
      //   new Promise((resolve, reject) => reject(new Error("cancelled")))
      // );
      this.close();
    },
    close() {
      this.state = null;
      this.open = false;
    },
    dialog({
      message,
      open,
      resolver,
      successMessage,
      confirmButton,
      cancelButton,
    }) {
      this.successMessage = successMessage
        ? successMessage
        : this.successMessage;
      this.confirmButton = confirmButton ? confirmButton : this.confirmButton;
      this.cancelButton = cancelButton ? cancelButton : this.cancelButton;
      this.message = message;
      this.open = open;
      this.resolver = resolver;
    },
  },
};
</script>
<style lang="scss">
.modal-wrapper {
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 100%;
}

.modal-backdrop {
  position: fixed;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(black, 0.75);
}
.modal {
  z-index: 110;
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: $color__core;
  transform: translate(-50%, -50%);
  border-radius: 1.5rem;
  padding: 4rem 4rem;
  height: auto;
  width: auto;
  max-width: 80%;

  @include RWD(mobile) {
    padding: 3rem 2rem;
    max-width: calc(100% - 4rem);
    width: 100%;
  }

  .close {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    background-color: white;
    border-radius: 50%;
    height: 4rem;
    width: 4rem;

    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 50%;
      width: 50%;
    }
  }
}
.modal .modal-body {
  .rte {
    @include RWD(mobile) {
      font-size: 1.4rem;
    }
    a {
      color: $color__bg-300;
      font-weight: 700;
    }
  }
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  transform: translateY(50%) translateY(4rem);
  margin-top: -4rem;
  button {
    margin-bottom: 0;
  }
}
</style>