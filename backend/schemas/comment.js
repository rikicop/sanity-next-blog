export default {
  name: "comment",
  type: "document",
  title: "Comment",
  fields: [
    {
      name: "name",
      type: "string",
      readOnly: true,
    },
    {
      name: "text",
      type: "text",
      readOnly: true,
    },
    {
      name: "approved",
      type: "boolean",
      defaultValue: false,
    },
    {
      name: "post",
      type: "reference",
      to: [{ type: "post" }],
    },
  ],
};
