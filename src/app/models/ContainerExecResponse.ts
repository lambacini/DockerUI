export class ContainerExecResponse {
  ExecID: string;
  Success: boolean;
  ContainerID: string;
  Message: string;
}

export class ContainerExecRequest {
  Connected: boolean;
  ExecID: string;
  ContainerID: string;
  Command: string;
}
