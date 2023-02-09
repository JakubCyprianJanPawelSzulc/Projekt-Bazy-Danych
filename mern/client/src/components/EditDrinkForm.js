import { useFormik } from 'formik';
import { useDispatch} from 'react-redux';
import React from 'react';

export default function EditDrinkForm({ drink, onChangedDetails}) {
  const initialValues = {
    strDrink: drink.strDrink,
    strAlcoholic: drink.strAlcoholic,
    strGlass: drink.strGlass,
    strInstructions: drink.strInstructions,
    strDrinkThumb: drink.strDrinkThumb,
    strRating: drink.strRating,
    strIngredients: drink.strIngredients,
    strMeasures: drink.strMeasures,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      fetch(`http://localhost:5000/drinks/update/${drink._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        params: { id: drink._id},
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.status === 200) {
          onChangedDetails();
        }
      });
      formik.resetForm({
        values: {
          strDrink: '',
          strAlcoholic: '',
          strGlass: '',
          strInstructions: '',
          strDrinkThumb: '',
          strRating: [],
          strIngredients: [],
          strMeasures: [],
        },
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="edit-drink-form">
      <input
        value={formik.values.strDrink}
        name="strDrink"
        placeholder="Nazwa drinka"
        onChange={formik.handleChange}
        required
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
      <select
        value={formik.values.strAlcoholic}
        onChange={formik.handleChange}
        name="strAlcoholic"
        required
      >
        <option value="Alcoholic">Alkoholowy</option>
        <option value="Non-alcoholic">Bezalkoholowy</option>
      </select>
      <input
        value={formik.values.strGlass}
        name="strGlass"
        placeholder="Szkło"
        onChange={formik.handleChange}
        required
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
      <textarea
        value={formik.values.strInstructions}
        name="strInstructions"
        placeholder="Instrukcje przygotowania (kolejne kroki podaj po kropce)"
        onChange={formik.handleChange}
        required
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        rows="3"
        cols="40"
      />
      <input
        value={formik.values.strDrinkThumb}
        name="strDrinkThumb"
        placeholder="Zdjęcie drinka"
        onChange={formik.handleChange}
        required
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
      <textarea
        value={formik.values.strIngredients}
        name="strIngredients"
        placeholder="Składniki (podaj po przecinku)"
        onChange={(e) =>
          formik.setFieldValue('strIngredients', e.target.value.split(','))
        }
        required
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        rows="3"
        cols="40"
      />
      <textarea
        value={formik.values.strMeasures}
        name="strMeasures"
        placeholder="Ilości składników (podaj po przecinku)"
        onChange={(e) =>
          formik.setFieldValue('strMeasures', e.target.value.split(','))
        }
        required
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        rows="3"
        cols="40"
      />
      <button className="submit-button" type="submit">
        akceptuj
      </button>
    </form>
  );
}
