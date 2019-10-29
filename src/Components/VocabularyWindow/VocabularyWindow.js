import React from "react";

import { mount, route } from "navi";

import { Vocabulary } from "../Vocabulary";
import { InfoBox } from "../InfoBox";

import * as sdk from "../../sdk";

const VocabularyWindow = ({ folder }) => {
  return (
    <div>
      <InfoBox name={folder.name} />
      <Vocabulary folder={folder} />
    </div>
  );
};

export default mount({
  "/:id": route({
    async getView(request) {
      try {
        const folder = await sdk.getFolder(request.params.id);
        return <VocabularyWindow folder={folder} />;
      } catch (error) {
        return <div>F</div>;
      }
    }
  })
});
