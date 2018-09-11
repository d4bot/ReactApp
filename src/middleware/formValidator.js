import empty from 'is-empty';
const validatorFunctions = {};

validatorFunctions.videoGameForm = payload => {
  let errors = {};
  let isValid = true;
  let message = '';

  if (payload) {
    if (empty(payload.name)) {
      errors.name = "Campo obligatorio";
      isValid = false;
    }

    if (empty(payload.description)) {
      errors.description = "Campo obligatorio";
      isValid = false;
    }

    if (empty(payload.developer)) {
      errors.developer = "Campo obligatorio";
      isValid = false;
    }

    if (empty(payload.genre)) {
      errors.genre = "Campo obligatorio";
      isValid = false;
    }

    if (empty(payload.platform)) {
      errors.platform = "Campo obligatorio";
      isValid = false;
    }

    if (empty(payload.releaseYear)) {
      errors.releaseYear = "Campo obligatorio";
      isValid = false;
    }

    if (empty(payload.esrbRating)) {
      errors.esrbRating = "Campo obligatorio";
      isValid = false;
    }

    if (payload.status == 'T' && empty(payload.userScore)) {
      errors.userScore = "Campo obligatorio";
      isValid = false;
    }
  }

  return {
    errors,
    isValid,
    message
  };
};

export default validatorFunctions;