import plugin from "tailwindcss/plugin";

/**
 * Tailwind v3 shim for the v4-style variants that current shadcn registry
 * components ship with (`data-checked:`, `data-active:`, `not-last:`,
 * `has-data-checked:`, `group-data-horizontal/tabs:` and friends).
 *
 * Simple state variants are registered through `theme.data` (see
 * `TAILWIND_V4_DATA`), which gives native `data-checked:`, named
 * `group-data-checked/name:` and `peer-data-checked:` support in v3. Radix exposes state via `data-state`, so the
 * v4 names map onto those attributes.
 */
export const TAILWIND_V4_DATA: Record<string, string> = {
  checked: 'state="checked"',
  unchecked: 'state="unchecked"',
  active: 'state="active"',
  inactive: 'state="inactive"',
  disabled: "disabled",
  invalid: 'invalid="true"',
  horizontal: 'orientation="horizontal"',
  vertical: 'orientation="vertical"',
};

function groupSelector(modifier: string | null | undefined) {
  return modifier ? `:merge(.group\\/${modifier})` : ":merge(.group)";
}

export const tailwindV4Compat = plugin(({ addVariant, matchVariant }) => {
  // Tooltip / popover use several "open" states, so these need a selector list.
  addVariant("data-open", [
    '&[data-state="open"]',
    '&[data-state="delayed-open"]',
    '&[data-state="instant-open"]',
  ]);
  addVariant("data-closed", '&[data-state="closed"]');

  addVariant("not-last", "&:not(:last-child)");
  addVariant("not-first", "&:not(:first-child)");
  addVariant("nth-last-2", "&:nth-last-child(2)");
  addVariant("has-disabled", "&:has(:disabled)");

  const values = TAILWIND_V4_DATA;

  // has-data-checked:  and  has-data-[slot=x]:
  matchVariant("has-data", (value) => `&:has([data-${value}])`, { values });
  // group-has-data-[slot=x]/item:
  matchVariant(
    "group-has-data",
    (value, { modifier }) => `${groupSelector(modifier)}:has([data-${value}]) &`,
    { values },
  );
  // not-data-checked:
  matchVariant("not-data", (value) => `&:not([data-${value}])`, { values });
  // in-data-[slot=x]:
  matchVariant("in-data", (value) => `:where([data-${value}]) &`, { values });
  // not-has-[:disabled]:
  matchVariant("not-has", (value) => `&:not(:has(${value}))`);
});
