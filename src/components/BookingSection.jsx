import { useMemo, useState } from 'react'
import { preorderItems } from '../data/restaurant'

const bookingFee = 149
const guestOptions = [1, 2, 3, 4, 5, 6, 8, 10].map((guest) => ({
  value: String(guest),
  label: `${guest} ${guest === 1 ? 'guest' : 'guests'}`,
  hint: guest <= 2 ? 'Couple table' : guest <= 6 ? 'Family table' : 'Large group',
}))
const seatingOptions = [
  { value: 'Indoor', label: 'Indoor', hint: 'Cool and quiet' },
  { value: 'Outdoor', label: 'Outdoor', hint: 'Open-air seating' },
  { value: 'Family area', label: 'Family area', hint: 'Spacious section' },
  { value: 'Window side', label: 'Window side', hint: 'Best ambience' },
]
const bookingDates = [
  { value: '2026-05-12', day: 'Tue', date: '12', month: 'May', hint: 'Today' },
  { value: '2026-05-13', day: 'Wed', date: '13', month: 'May', hint: 'Lunch open' },
  { value: '2026-05-14', day: 'Thu', date: '14', month: 'May', hint: 'Dinner open' },
  { value: '2026-05-15', day: 'Fri', date: '15', month: 'May', hint: 'Few tables' },
  { value: '2026-05-16', day: 'Sat', date: '16', month: 'May', hint: 'Weekend' },
  { value: '2026-05-17', day: 'Sun', date: '17', month: 'May', hint: 'Family rush' },
  { value: '2026-05-18', day: 'Mon', date: '18', month: 'May', hint: 'Easy booking' },
]
const timeGroups = [
  {
    period: 'Lunch',
    note: 'Best for quick meals',
    slots: ['12:30 PM', '1:15 PM', '2:00 PM'],
  },
  {
    period: 'Dinner',
    note: 'Family and group dining',
    slots: ['7:00 PM', '8:15 PM', '9:00 PM'],
  },
]

function CustomDropdown({ label, helper, value, options, onChange, badge }) {
  const [open, setOpen] = useState(false)
  const selected = options.find((option) => option.value === value) ?? options[0]

  return (
    <div className="custom-dropdown-field">
      <span className="field-label">{label}</span>
      <div className={open ? 'custom-dropdown open' : 'custom-dropdown'}>
        <button className="dropdown-trigger" type="button" onClick={() => setOpen((current) => !current)}>
          <span className="dropdown-badge">{badge}</span>
          <span>
            <strong>{selected.label}</strong>
            <small>{selected.hint}</small>
          </span>
          <i aria-hidden="true"></i>
        </button>
        {open && (
          <div className="dropdown-menu">
            {options.map((option) => (
              <button
                className={option.value === value ? 'dropdown-option selected' : 'dropdown-option'}
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
              >
                <span>
                  <strong>{option.label}</strong>
                  <small>{option.hint}</small>
                </span>
                {option.value === value && <em>Selected</em>}
              </button>
            ))}
          </div>
        )}
      </div>
      <small>{helper}</small>
    </div>
  )
}

function InlineCalendarPicker({ value, onChange }) {
  return (
    <div className="inline-calendar-picker">
      <div className="calendar-menu-header">
        <span>May 2026</span>
        <strong>Select date</strong>
      </div>
      <div className="calendar-grid-picker inline">
        {bookingDates.map((date) => (
          <button
            className={date.value === value ? 'calendar-date selected' : 'calendar-date'}
            key={date.value}
            type="button"
            onClick={() => onChange(date.value)}
          >
            <span>{date.day}</span>
            <strong>{date.date}</strong>
            <small>{date.hint}</small>
          </button>
        ))}
      </div>
    </div>
  )
}

function TimeSlotPicker({ value, onChange }) {
  const suggestedSlots = timeGroups.flatMap((group) => group.slots)
  const isCustomTime = !suggestedSlots.includes(value)

  return (
    <div className="time-picker">
      <div className="time-picker-header">
        <div>
          <span>Available time</span>
          <p>Select a suggested slot for your visit.</p>
        </div>
        <strong>{value}</strong>
      </div>
      <div className="time-groups">
        {timeGroups.map((group) => (
          <div className="time-group" key={group.period}>
            <div className="time-group-title">
              <span>{group.period}</span>
              <small>{group.note}</small>
            </div>
            <div className="time-slot-grid">
              {group.slots.map((slot) => (
                <button
                  className={value === slot ? 'time-slot-card active' : 'time-slot-card'}
                  key={slot}
                  type="button"
                  onClick={() => onChange(slot)}
                >
                  <strong>{slot}</strong>
                  <small>{group.period === 'Lunch' ? 'Fast service' : 'Popular'}</small>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={isCustomTime ? 'custom-time-box active' : 'custom-time-box'}>
        <div>
          <span>Custom timing</span>
          <p>Choose any time if the suggested slots do not fit your plan.</p>
        </div>
        <label>
          Preferred time
          <input
            type="time"
            value={isCustomTime ? value : ''}
            onChange={(event) => onChange(event.target.value)}
          />
        </label>
      </div>
    </div>
  )
}

function BookingSection() {
  const [booking, setBooking] = useState({
    date: '2026-05-12',
    guests: '2',
    seating: 'Indoor',
    slot: '7:00 PM',
    name: '',
    phone: '',
    preorder: [],
  })
  const [confirmed, setConfirmed] = useState(false)

  const summary = useMemo(
    () => `${booking.guests} guests - ${booking.date} - ${booking.slot}`,
    [booking],
  )

  const preorderTotal = useMemo(
    () =>
      preorderItems
        .filter((item) => booking.preorder.includes(item.id))
        .reduce((total, item) => total + item.price, 0),
    [booking.preorder],
  )

  const selectedPreorder = preorderItems.filter((item) => booking.preorder.includes(item.id))
  const payableNow = bookingFee + preorderTotal

  function updateBooking(event) {
    const { name, value } = event.target
    setBooking((current) => ({ ...current, [name]: value }))
  }

  function updateField(name, value) {
    setBooking((current) => ({ ...current, [name]: value }))
  }

  function submitBooking(event) {
    event.preventDefault()
    setConfirmed(true)
  }

  function togglePreorder(itemId) {
    setBooking((current) => ({
      ...current,
      preorder: current.preorder.includes(itemId)
        ? current.preorder.filter((id) => id !== itemId)
        : [...current.preorder, itemId],
    }))
  }

  return (
    <section className="section booking-section" id="booking">
      <div className="section-heading">
        <span className="eyebrow">Quick reservation</span>
        <h2>Book your table</h2>
        <p>No backend needed for this demo. The form uses static time slots and shows a confirmation instantly.</p>
      </div>

      <form className="booking-card" onSubmit={submitBooking}>
        <div className="calendar-only-row">
          <span className="field-label">Date</span>
          <InlineCalendarPicker value={booking.date} onChange={(value) => updateField('date', value)} />
        </div>
        <CustomDropdown
          badge="Guests"
          helper="Choose group size"
          label="Guests"
          onChange={(value) => updateField('guests', value)}
          options={guestOptions}
          value={booking.guests}
        />
        <CustomDropdown
          badge="Seat"
          helper="Pick preferred table zone"
          label="Seating"
          onChange={(value) => updateField('seating', value)}
          options={seatingOptions}
          value={booking.seating}
        />

        <TimeSlotPicker value={booking.slot} onChange={(slot) => updateField('slot', slot)} />

        <div className="preorder-panel">
          <div className="preorder-header">
            <div>
              <span>Suggested starter preorder</span>
              <p>Add starters now so they can reach the table soon after guests arrive.</p>
            </div>
            <strong>{selectedPreorder.length} selected</strong>
          </div>
          <div className="preorder-grid">
            {preorderItems.map((item) => {
              const selected = booking.preorder.includes(item.id)

              return (
                <button
                  className={selected ? 'preorder-item selected' : 'preorder-item'}
                  key={item.id}
                  type="button"
                  onClick={() => togglePreorder(item.id)}
                >
                  <small>{item.category}</small>
                  <strong>{item.name}</strong>
                  <span>{item.serves}</span>
                  <p>{item.note}</p>
                  <em>Rs. {item.price}</em>
                </button>
              )
            })}
          </div>
          <div className="preorder-summary">
            <span>Preorder subtotal</span>
            <strong>Rs. {preorderTotal}</strong>
          </div>
        </div>

        <label>
          Full name
          <input
            name="name"
            type="text"
            placeholder="Enter your name"
            value={booking.name}
            onChange={updateBooking}
            required
          />
        </label>
        <label>
          Mobile number
          <input
            name="phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={booking.phone}
            onChange={updateBooking}
            required
          />
        </label>

        <div className="booking-footer">
          <div>
            <span>Your selection</span>
            <strong>{summary}</strong>
            <small>Booking fee: Rs. {bookingFee}</small>
            <small>Preorder total: Rs. {preorderTotal}</small>
            <small>Payable now: Rs. {payableNow}</small>
          </div>
          <button className="primary-button" type="submit">
            Pay and Confirm
          </button>
        </div>
      </form>

      {confirmed && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
          <div className="confirm-modal">
            <button className="close-button" type="button" onClick={() => setConfirmed(false)} aria-label="Close">
              x
            </button>
            <span className="success-mark">OK</span>
            <h3 id="confirm-title">Table request received</h3>
            <p>
              Thanks {booking.name || 'guest'}. Your table for {summary} in the {booking.seating.toLowerCase()} section
              is ready for demo confirmation. Demo amount charged: Rs. {payableNow}, including Rs. {bookingFee} booking fee.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

export default BookingSection
