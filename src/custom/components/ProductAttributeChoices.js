import React from "react";
import { ComponentSectionTitle } from "../../custom/components/Text";

export default () => {
  try {
    const { classes } = this.props;
    return (
      <section className={classes.section}>
        <ComponentSectionTitle title="Filter cabinets by dimensions" gold={true} />
        <div className={classes.categoryFilters}>
          {this.renderCategorySelect({
            category: "Width",
            options: [{ value: 20, label: "20" }, { value: 21, label: "21" }]
          })}
          {this.renderCategorySelect({
            category: "Height",
            options: [{ value: 20, label: "20" }, { value: 21, label: "21" }]
          })}
          {this.renderCategorySelect({
            category: "Depth",
            options: [{ value: 20, label: "20" }, { value: 21, label: "21" }]
          })}
        </div>
      </section>
    );
  } catch (err) {
    console.error("err: ", err);
    return <div>error here</div>;
  }
};
