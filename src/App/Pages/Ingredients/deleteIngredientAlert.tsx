import { IonAlert } from "@ionic/react";
import { useAppDispatch } from "lib/hooks/store";
import { IIngredient } from "lib/interfaces";
import { deleteIngredient } from "lib/store/ingredientsSlice";
import React from "react";
import { useIntl } from "react-intl";

interface IDeleteIngredientAlert {
  isOpen: boolean;
  closeAlertCallback: () => void;
  closeModalCallback: () => void;
  selectedIngredient?: IIngredient;
}

const DeleteIngredientAlert: React.FC<IDeleteIngredientAlert> = ({
  isOpen,
  closeAlertCallback,
  closeModalCallback,
  selectedIngredient,
}) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const onDeleteIngredient = async () => {
    if (selectedIngredient) {
      await dispatch(deleteIngredient(selectedIngredient));
    }
    closeAlertCallback();
    closeModalCallback();
  };

  return (
    <IonAlert
      isOpen={isOpen}
      onDidDismiss={closeAlertCallback}
      cssClass={"my-custom-select"}
      subHeader={intl.formatMessage({
        defaultMessage: "Are you sure you want to delete this ingredient?",
        id: "N+8klo",
      })}
      buttons={[
        {
          text: intl.formatMessage({
            defaultMessage: "No, Cancel",
            id: "tjhcV3",
          }),
          role: "cancel",
          handler: closeAlertCallback,
        },
        {
          text: intl.formatMessage({
            defaultMessage: "Yes, Delete",
            id: "QEmYhz",
          }),
          handler: onDeleteIngredient,
        },
      ]}
    />
  );
};

export default DeleteIngredientAlert;
