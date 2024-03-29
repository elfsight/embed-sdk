import styled from 'styled-components';

import { validate } from '../../helpers';

import SvgPlus from '../../icons/plus.svg';
import SvgClose from '../../icons/close.svg';
import SvgTrash from '../../icons/trash.svg';
import SvgEdit from '../../icons/edit.svg';
import SvgSearch from '../../icons/search.svg';
import SvgGlyph from '../../icons/glyph.svg';

const TYPES = ['plus', 'close', 'trash', 'edit', 'search', 'glyph'];
const defineSvg = (name) => ({
  plus: SvgPlus, close: SvgClose, trash: SvgTrash, edit: SvgEdit, search: SvgSearch, glyph: SvgGlyph
}[name]);

export function Icon({
  className, type, size = '20px', color = '#fff', offset
}) {
  type = validate.inArray(type, TYPES, 'glyph');

  const SvgComponent = (() => defineSvg(type))();

  return (
    <IconComponent
      iconOffset={offset}
      iconSize={size}
      className={className}
    >
      <SvgComponent fill={color} />
    </IconComponent>
  );
}

const IconComponent = styled.div`
  width: ${(props) => props.iconSize};
  height: ${(props) => props.iconSize};
  flex: 0 0 ${(props) => props.iconSize};
  margin-right: ${(props) => props.iconOffset};
  line-height: 0;
`;
