import { certs, seats } from './const';

interface Named {
  name: string;
}

function sortByName(p1: Named, p2: Named) {
  if (p1.name < p2.name) {
    return -1;
  }
  if (p1.name > p2.name) {
    return 1;
  }
  return 0;
}

type CertType = (typeof certs)[number];

interface Staff extends Named {
  brevetto: CertType;
}

export function sortByCert(p1: Staff, p2: Staff) {
  const i1 = certs.indexOf(p1.brevetto);
  const i2 = certs.indexOf(p2.brevetto);
  return i2 - i1 || sortByName(p1, p2);
}

interface Council extends Staff {
  council_seat: (typeof seats)[number];
}

export function sortBySeat(p1: Council, p2: Council) {
  const i1 = seats.indexOf(p1.council_seat);
  const i2 = seats.indexOf(p2.council_seat);
  return i2 - i1 || sortByCert(p1, p2);
}
