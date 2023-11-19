import { mapEditorValue } from "@/helper";
import { useJsonStore } from "@/stores";
import { ObjectJsonValues, TypeOption } from "@/types";
import { isArray } from "lodash";
import { v4 as uuid } from "uuid";

type ConditionMapValue = Record<TypeOption, ObjectJsonValues[]>;

const useHandleEditor = () => {
  const { values, setValues, resetValues } = useJsonStore((store) => ({
    values: store.values,
    setValues: store.onSetValues,
    resetValues: store.onResetValues,
  }));

  const onAddField = () => {
    const newValue = {
      id: uuid(),
      key: "",
      value: null,
      dataType: null,
    };

    setValues([...values, newValue]);
  };

  const onRemoveField = (removeId: string) => {
    const removedValue = values.length
      ? values.filter((value) => value.id !== removeId)
      : values;

    setValues(removedValue);
  };

  const onKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id: _id } = event.target;

    const updatedKeyItem = values.map((_value) => {
      if (_value.id === _id)
        return { ..._value, key: value.replaceAll(" ", "_") };

      return _value;
    });

    setValues(updatedKeyItem);
  };

  const onDataTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = event.target;
    const selectedType = value as TypeOption;

    const found = values.find((val) => val.id === name);

    const mapValue = mapEditorValue(
      value as TypeOption,
      found?.key
    ) as TypeOption;

    const updatedValueItem = values.map((_value) => {
      if (_value.id === name)
        return { ..._value, value: mapValue, dataType: selectedType };

      return _value;
    });

    setValues(updatedValueItem);
  };

  const onAddSubField = (
    selectedId: string,
    key: string,
    selectedType: TypeOption
  ) => {
    const conditionAddedState = {
      arrayOfString: values.map((val) =>
        val.id === selectedId
          ? {
              ...val,
              value: isArray(val.value)
                ? [...val.value, mapEditorValue("string", key)]
                : [null],
            }
          : val
      ),
    } as ConditionMapValue;

    const defaultValue = values.map((val) =>
      val.id === selectedId
        ? {
            ...val,
            value: isArray(val.value)
              ? [...val.value, mapEditorValue("arrayOfString", key)]
              : [null],
          }
        : val
    );

    const mapAddedValueResponse =
      conditionAddedState[selectedType] ?? defaultValue;

    setValues(mapAddedValueResponse);
  };

  const onRemoveSubField = (_id: string, _type: TypeOption, _index: number) => {
    const conditionsRemovedState = {
      arrayOfString: values.map((val) =>
        val.dataType === _type && isArray(val.value)
          ? {
              ...val,
              value: val.value.filter((_, subIndex) => subIndex !== _index),
            }
          : val
      ),
    } as ConditionMapValue;

    const mapRemovedValueResponse = conditionsRemovedState[_type] ?? values;

    setValues(mapRemovedValueResponse);
  };

  return {
    onAddField,
    onRemoveField,
    onInputChange: onKeyChange,
    onSelectChange: onDataTypeChange,
    subFields: { onAddSubField, onRemoveSubField },
    store: { values, resetValues },
  };
};

export default useHandleEditor;
