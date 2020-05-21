import React, { useState } from "react";
import { Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import DataSourceHOC, {
  DataSourceInterface,
} from "../../HOC/DataSource/DataSourceHOC";

interface AdminBlockInterface {
  props: {
    type: string;
    permissions: {
      allow?: string[];
      deny?: string[];
    };
    options: {
      dataSource: DataSourceInterface<any>;
    };
    config: any;
  };
}
const AdminBlock = ({ props }: AdminBlockInterface) => {
  const [cmp, setCmp] = useState();
  import(`commonComponents/${props.type}`).then(
    (module) => setCmp(module.default),
    console.error,
  );
  if (!cmp) {
    return null;
  }
  console.log(cmp);
  const WrappedComponent = DataSourceHOC(cmp);
  return (
    <Container>
      <Paper elevation={3}>
        <WrappedComponent {...props} dataSource={props.options.dataSource} />
      </Paper>
    </Container>
  );
};

export default React.memo(AdminBlock);
