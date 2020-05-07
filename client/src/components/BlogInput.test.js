import React from "react";
import { cleanup, render } from "@testing-library/react";
import { BlogInput } from "./BlogInput";

afterEach(cleanup);

function renderBlogInput(args) {
  const defaultProps = {
    loading: false,
    course: {},
    saving: false,
    errors: {},
    classes: {},
    handleSubmit: () => {},
  };

  const props = { ...defaultProps, ...args };
  return render(<BlogInput {...props} />);
}

it('should label save button as "Save" when not saving', () => {
  const { getByText } = renderBlogInput();
  getByText("Save");
});

it('should label save button as "Saving..." when saving', () => {
  const { getByText } = renderBlogInput({ loading: true });
  getByText("Saving...");
});
