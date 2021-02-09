import React, {useCallback, useState, FC, useMemo} from 'react';
import {Button, Input, Select, Textarea} from "../../../../components";
import styles from './ArticleForm.module.css'
import {Article} from "../../types";

interface IArticleForm extends Article {
  className?: string,
  onSubmit?: (article: Article) => void,
  onCancel?: () => void
}

const initialFormState = {
  id: 0,
  name: '',
  description: '',
  barCode: undefined,
  unit: 'gr',
};

export const ArticleForm: FC<IArticleForm> = ({
  className,
  onSubmit,
  onCancel,
  id = 0,
  name,
  description,
  barCode,
  unit,
}) => {
  const [articleForm, setArticleForm] = useState(() => {
    if (id > 0) {
      return {
        id,
        name,
        description,
        barCode,
        unit,
      }
    }
    return initialFormState
  })

  const handleChange = useCallback(
    e => {
      const { target = {} } = e;
      const { name, value } = target;
      setArticleForm(prevState => ({ ...prevState, [name]: value }))
    },
    []
  );

  const handleUnitChange = useCallback((units) => {
    setArticleForm(prevState => ({ ...prevState, unit: units[0] }))
  }, [])

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (articleForm.name && articleForm.name.length > 0 && typeof onSubmit === 'function') {
        onSubmit(articleForm);
      }
    },
    [onSubmit, articleForm]
  );

  const unitForm = useMemo(() => {
    if (articleForm.unit) {
      return [articleForm.unit]
    }
    return []
  }, [articleForm.unit])

  return (
    <form
      className={`${styles.article_form_wrapper} ${className}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.article_form_element}>
        <Input
          required
          placeholder="Article name..."
          name="name"
          id="name"
          onChange={handleChange}
          value={articleForm.name}
          autoFocus
        />
      </div>
      <div className={styles.article_form_element}>
        <Textarea
          placeholder="..."
          onChange={handleChange}
          value={articleForm.description}
          name="description"
        />
      </div>
      <div className={styles.article_form_element}>
        <Input
          placeholder="Barcode..."
          name="barCode"
          id="barcode"
          onChange={handleChange}
          value={articleForm.barCode}
        />
      </div>
      <div className={styles.article_form_element}>
        <Select
          target={<Button>Unit: {articleForm.unit}</Button>}
          options={[
            { id: 'Kg', name: 'Kg' },
            { id: 'gr', name: 'gr' },
            { id: 'T', name: 'T' },
          ]}
          onChange={handleUnitChange}
          selectedOptionIds={unitForm}
          disableSearch
        />
      </div>
      <div className={styles.buttons}>
        <Button
          mode="primary"
          disabled={typeof articleForm.name === 'string' && articleForm.name.length === 0}
          className={styles.submit_button}
          type="submit"
        >
          Submit
        </Button>
        <Button
          type="button"
          mode="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
