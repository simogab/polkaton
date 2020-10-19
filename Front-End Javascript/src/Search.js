import React, { useRef, useState } from "react";
import { Table, Grid, Button } from "semantic-ui-react";
import { useSubstrate } from "./substrate-lib";

export default function SearchBlock(props) {
  const { api } = useSubstrate();
  const [blockInfo, setBlockInfo] = useState({});
  const inputRef = useRef(null);

  const handleSearch = async () => {
    setBlockInfo(null);
    const searchValue = inputRef.current.value;

    if (!searchValue) return;
    let block = {};
    try {
      if (searchValue.indexOf('0x') >= 0) {
        block = await api.rpc.chain.getBlock(searchValue);
      } else {
        const hash = await api.rpc.chain.getBlockHash(searchValue);
        block = await api.rpc.chain.getBlock(hash);
      }
      setBlockInfo([
        { name: "Number", value: block.block.header.number.toNumber() },
        { name: "Parent Hash", value: block.block.header.parentHash.toHex() },
        { name: "Hash", value: block.block.header.hash.toHex() },
        { name: "extrinsicsRoot", value: block.block.header.extrinsicsRoot.toHuman() },
        { name: "State Root", value: block.block.header.stateRoot.toHuman() },
      ]);
    } catch (err) {
      console.error(err);
    }
    
  };

  return (
    <Grid.Column>
      <h1>Search by Block Number</h1>
      <input ref={inputRef} type="text" />
      <Button onClick={handleSearch}>Search</Button>
      {blockInfo && (
        <Table celled striped size="small">
          <Table.Body>
            {blockInfo && blockInfo[0] ? (
              blockInfo.map((info) => (
                <Table.Row key={info.name}>
                  <Table.Cell width={1} textAlign="right">
                    {info.name}
                  </Table.Cell>
                  <Table.Cell width={3}>{info.value}</Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row></Table.Row>
            )}
          </Table.Body>
        </Table>
      )}
    </Grid.Column>
  );
}