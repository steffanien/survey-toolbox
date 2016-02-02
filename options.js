function save_options() {
  var RS = document.getElementById('rs').checked;
  var TS = document.getElementById('360').checked;
  var EE = document.getElementById('ee').checked;
  var TA = document.getElementById('ta').checked;
  var VOC = document.getElementById('voc').checked;
  var SI = document.getElementById('si').checked;
  chrome.storage.sync.set({ //THIS IS THE WAY YOU SAVE STUFF TO THE USERS'S CHROME STORAGE
    rs: RS,
    ts: TS,
    ee: EE,
    ta: TA,
    voc: VOC,
    si: SI
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    rs: 'RS',
    ts: '', 
    ee: '',
    ta: '',
    voc: '',
    si: ''
  }, function(items) {
    document.getElementById('rs').checked = items.rs;
    console.log(items.ts);
    document.getElementById('360').checked = items.ts;
    document.getElementById('ee').checked = items.ee;
    document.getElementById('ta').checked = items.ta;
    document.getElementById('voc').checked = items.voc;
    document.getElementById('si').checked = items.si;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('Wrapper').addEventListener('change',
    save_options);