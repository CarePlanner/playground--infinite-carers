import React from 'react';
import Radium from 'radium';
import styles from './styles';

class Table extends React.Component {

  render() {

    const {
      headers,
      rows,
      bodyTrStyle,
      bodyTdOnClick,
      bodyTdOnMouseMove,
      bodyTdOnMouseLeave,
      bodyTrOnClick,
      bodyTrOnMouseMove,
      bodyTrOnMouseLeave
    } = this.props;

    return (
      <table style={styles.table}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th style={styles.th}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => {
            const rowRef = React.createRef();
            return (
              <tr
                key={i}
                ref={rowRef}
                style={[((i % 2 === 0) ? styles.trOdd : styles.trEven), bodyTrStyle && bodyTrStyle(row, i)]}
                onClick={(e) => bodyTrOnClick && bodyTrOnClick(e, row, i, rowRef.current)}
                onMouseMove={(e) => bodyTrOnMouseMove && bodyTrOnMouseMove(e, row, i, rowRef.current)}
                onMouseLeave={(e) => bodyTrOnMouseLeave && bodyTrOnMouseLeave(e, row, i, rowRef.current)}
                >
                {row.map((cell, j) => {
                  const cellRef = React.createRef();
                  return (
                    <td
                      ref={cellRef}
                      key={j}
                      style={styles.td}
                      onClick={(e) => bodyTdOnClick && bodyTdOnClick(e, cell, j, cellRef.current)}
                      onMouseMove={(e) => bodyTdOnMouseMove && bodyTdOnMouseMove(e, cell, j, cellRef.current)}
                      onMouseLeave={(e) => bodyTdOnMouseLeave && bodyTdOnMouseLeave(e, cell, j, cellRef.current)}>
                      {(typeof cell === 'string') ? cell : (typeof cell === 'object' && cell.content) ? cell.content : cell}
                    </td>
                  );
                })}
              </tr>
            );
          }
        )}
        </tbody>
      </table>
    );
  }
}

export default Radium(Table);
