import React from 'react';
import Radium from 'radium';
import styles from './styles';

class Table extends React.Component {

  render() {

    const { headers, rows } = this.props;

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
            <tr style={((i % 2 === 0) ? styles.trOdd : styles.trEven)}>
              {row.map((cell) => (
                <td style={styles.td}>
                  {cell}
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
