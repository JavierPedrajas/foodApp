import { IonAlert } from "@ionic/react";
import { useAppDispatch } from "lib/hooks/store";
import { IRecipe } from "lib/interfaces";
import { deleteRecipe } from "lib/store/recipesSlice";
import React from "react";
import { useIntl } from "react-intl";

interface IDeleteRecipeAlert {
  isOpen: boolean;
  closeAlertCallback: () => void;
  closeModalCallback: () => void;
  selectedRecipe?: IRecipe;
}

const DeleteRecipeAlert: React.FC<IDeleteRecipeAlert> = ({
  isOpen,
  closeAlertCallback,
  closeModalCallback,
  selectedRecipe,
}) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const onDeleteRecipe = async () => {
    if (selectedRecipe) {
      await dispatch(deleteRecipe(selectedRecipe));
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
        defaultMessage: "Are you sure you want to delete this recipe?",
        id: "YZqIjh",
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
          handler: onDeleteRecipe,
        },
      ]}
    />
  );
};

export default DeleteRecipeAlert;
