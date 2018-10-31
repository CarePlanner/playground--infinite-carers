import React from 'react';
import Radium from 'radium';
import styles from './styles';

class Table extends React.Component {

  render() {

    const { headers, rows, bodyTrStyle, bodyTdOnClick, bodyTdOnMouseMove, bodyTdOnMouseLeave } = this.props;

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
          {rows.map((row, i) => (
            <tr style={[((i % 2 === 0) ? styles.trOdd : styles.trEven), bodyTrStyle && bodyTrStyle(row, i)]} key={i}>
              {row.map((cell, j) => (
                <td
                  style={styles.td}
                  onClick={(e) => bodyTdOnClick && bodyTdOnClick(e, cell, j)}
                  onMouseMove={(e) => bodyTdOnMouseMove && bodyTdOnMouseMove(e, cell, j)}
                  onMouseLeave={(e) => bodyTdOnMouseLeave && bodyTdOnMouseLeave(e, cell, j)}>
                  {(typeof cell === 'string') ? cell : (typeof cell === 'object' && cell.content) ? cell.content : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Radium(Table);
