export default function LayoutMapping(keyboard){
    /**
     * Registering module
     */
    keyboard.registerModule("layoutMapping", (module) => {
      let { sourceLayout, targetLayout } = keyboard.options;
  
      module.fn = {};
      module.fn.handleButtonClicked = keyboard.handleButtonClicked;
      module.fn.beforeRender = keyboard.beforeRender;
  
      keyboard.handleButtonClicked = (button) => {
        console.log("** SOURCE BUTTON ***", button);
        const targetButton = module.getButtonInTargetLayout(button);
        console.log("** TARGET BUTTON ***", targetButton);
        module.fn.handleButtonClicked(targetButton);
      };
  
      keyboard.beforeRender = () => {
        const display = keyboard.options.display || {};
        const sourceLayoutButtons = module.getRowButtons(sourceLayout);
        const targetLayoutButtons = module.getRowButtons(targetLayout);
        const { layoutName } = keyboard.options;
  
        sourceLayoutButtons[layoutName].forEach((row, rowIndex) => {
          const sourceRowLen = row.length;
          const targetRowLen = targetLayoutButtons[layoutName][rowIndex].length;
  
          if (sourceRowLen !== targetRowLen) {
            console.error(
              `ROW ${rowIndex} ERROR: source (${sourceRowLen}) and target (${targetRowLen}) size mismatch! All rows must have the same size`
            );
          }
  
          row.forEach((sourceButton, buttonIndex) => {
            const targetButton =
              targetLayoutButtons[layoutName][rowIndex][buttonIndex];
  
            if (sourceButton[0] === "{" || targetButton[0] === "{") return;
  
            display[sourceButton] = targetButton;
          });
        });
  
        keyboard.options.display = display;
        keyboard.options.mergeDisplay = true;
  
        module.fn.beforeRender();
      };
  
      module.getButtonInTargetLayout = (button) => {
        let sourceButtonElement = module.getButtonInLayout(button);
  
        if (sourceButtonElement && sourceButtonElement.length > 1) {
          sourceButtonElement = sourceButtonElement[0];
        }
  
        if (!sourceButtonElement) return;
  
        const skbtnuid = sourceButtonElement.getAttribute("data-skbtnuid");
        const [sourceButtonLayoutName, sourceBtnLocation] = skbtnuid.split("-");
        const [sourceBtnRow, sourceBtnIndex] = sourceBtnLocation
          .replace("r", "")
          .split("b");
  
        const targetButton = module.findLayoutKeyByIndex(
          sourceBtnRow,
          sourceBtnIndex,
          targetLayout,
          sourceButtonLayoutName
        );
  
        return targetButton;
      };
  
      /**
       * Get button in layout
       */
      module.getButtonInLayout = (layoutKeyName) => {
        let buttonElement =
          keyboard.getButtonElement(layoutKeyName) ||
          keyboard.getButtonElement(`{${layoutKeyName}}`);
  
        return buttonElement;
      };
  
      /**
       * Find layout key by index
       */
      module.findLayoutKeyByIndex = (
        rIndex,
        bIndex,
        layout,
        layoutName = keyboard.options.layoutName
      ) => {
        let row = layout[layoutName][rIndex];
  
        if (row) {
          let rowButtons = row.split(" ");
          return rowButtons[bIndex];
        }
      };
  
      /**
       * Get row buttons
       */
      module.getRowButtons = (layout) => {
        const updatedLayout = { ...layout };
  
        Object.keys(updatedLayout).forEach((layoutName) => {
          updatedLayout[layoutName] = updatedLayout[layoutName].map((row) => {
            return row.split(" ");
          });
        });
  
        return updatedLayout;
      };
  
      /**
       * Highlight button
       */
      module.keyboardPressButton = (event) => {
        let physicalKeyboardKeyName = module.sourceLayoutKeyMaps(
          keyboard.physicalKeyboard.getSimpleKeyboardLayoutKey(event)
        );
  
        console.log("*** PRESSED KEY ***", physicalKeyboardKeyName);
  
        const targetButton = module.getButtonInTargetLayout(
          physicalKeyboardKeyName
        );
  
        if (!targetButton) return;
  
        module.fn.handleButtonClicked(targetButton);
      };
  
      /**
       * Define key listeners
       */
      module.initListeners = () => {
        /**
         * Handle keyboard press
         */
        document.addEventListener("keydown", (event) => {
          module.keyboardPressButton(event);
        });
      };
  
      /**
       * Custom layout overrides
       */
      module.sourceLayoutKeyMaps = (keyName) => {
        let retval;
        switch (keyName) {
          case "backspace":
            retval = "{bksp}";
            break;
  
          case "shiftleft":
            retval = "{shift}";
            break;
  
          case "shiftright":
            retval = "{shift}";
            break;
  
          case "space":
            retval = "{space}";
            break;
  
          case "enter":
            retval = "{enter}";
            break;
  
          case "capslock":
            retval = "{lock}";
            break;
  
          default:
            retval = keyName;
            break;
        }
  
        return retval;
      };
  
      /**
       * Start module
       */
      module.start = () => {
        module.initListeners();
        keyboard.setOptions({
          layout: sourceLayout
        });
      };
  
      module.start();
    });
  };
  