export const categories = [
  { key: 'uk_tops', label: '🇬🇧 UK TOPS' },
  { key: 'uk_mids', label: '🇬🇧 UK MIDS' },
  { key: 'cali_packs', label: '🇺🇸 CALI PACKS' },
  { key: 'extracts', label: '🍯 EXTRACTS' },
  { key: 'hash', label: '#️⃣ HASH' },
  { key: 'edibles', label: '🍫 EDIBLES' },
  { key: 'how_to_order', label: '📃 HOW TO ORDER', type: 'info' },
  { key: 'postal_info', label: '📮 POSTAL INFO', type: 'info' },
];

export const items = {
  uk_tops: [
    { name: 'Restocking…', disabled: true }
  ],
  cali_packs: [
    { name: 'Restocking…', disabled: true }
  ],
  extracts: [
    {
      id: 'gas-og',
      name: 'GAS OG',
      emoji: '⛽️🍯',
      photo: 'https://placehold.co/800x500?text=GAS+OG',
      looks: null,
      nose: null,
      smoothness: null,
      flavour: { citrus: 0, fruit: 0, gas: 0, earthy: 0, herbal: 0, spicy: 0, dessert: 0, pine: 0 },
      dominant: '',
      terp: '',
      verdict: ''
    }
  ],
  hash: [
    {
      id: 'cali-mouse-hash',
      name: 'CALI MOUSE HASH',
      emoji: '🔥⛽️🍫',
      photo: 'https://placehold.co/800x500?text=CALI+MOUSE+HASH',
      looks: null,
      nose: null,
      smoothness: null,
      flavour: { citrus: 0, fruit: 0, gas: 0, earthy: 0, herbal: 0, spicy: 0, dessert: 0, pine: 0 },
      dominant: '',
      terp: '',
      verdict: ''
    }
  ],
  edibles: [
    { name: 'Restocking…', disabled: true }
  ]
};

export const infoPages = {
  how_to_order: `<p>Message <strong>@TEATIME110</strong> with:<br>• Strain name(s)<br>• Quantity (g)<br>• Postcode</p>
   <p><strong>Payment:</strong> Bank transfer or <em>PayPal Friends & Family</em>.</p>
   <p>We’ll confirm total + dispatch window and send your reference.</p>`,
  postal_info: `<p><strong>Dispatch:</strong> Orders before <strong>11:00</strong> are eligible for <em>same-day dispatch</em>. Orders after 11:00 ship the <em>next day</em>.</p>
   <p><strong>Services:</strong> Royal Mail First Class or Tracked 24 (next-day).</p>
   <p><strong>Tracking:</strong> Provided for Tracked 24. First Class is untracked.</p>
   <p><strong>Packaging:</strong> Discreet, smell-proof, letterbox-friendly where possible.</p>
   <p><strong>Notes:</strong> Weekend/Bank Holiday dispatch may vary; you’ll receive an ETA in chat.</p>`
};
