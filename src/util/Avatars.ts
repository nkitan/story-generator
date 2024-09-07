import { useMemo } from 'react';
import { createAvatar } from '@dicebear/core';
import { notionists } from '@dicebear/collection';
import Image from 'next/image';

function GenerateAvatar() {
  const avatar = useMemo(() => {
    return createAvatar(notionists, {
      size: 128,
      backgroundColor: ["b6e3f4","c0aede","d1d4f9"],
      backgroundType: ["gradientLinear","solid"]
    }).toDataUri();
  }, []);

  return avatar;
}

export default GenerateAvatar;